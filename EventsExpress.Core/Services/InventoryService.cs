﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using EventsExpress.Core.DTOs;
using EventsExpress.Core.Exceptions;
using EventsExpress.Core.IServices;
using EventsExpress.Db.BaseService;
using EventsExpress.Db.EF;
using EventsExpress.Db.Entities;
using Microsoft.EntityFrameworkCore;

namespace EventsExpress.Core.Services
{
    public class InventoryService : BaseService<Inventory>, IInventoryService
    {
        public InventoryService(
            AppDbContext context,
            IMapper mapper)
            : base(context, mapper)
        {
        }

        public async Task<Guid> AddInventar(Guid eventId, InventoryDTO inventoryDTO)
        {
            var ev = _context.Events.FirstOrDefault(e => e.Id == eventId);
            if (ev == null)
            {
                throw new EventsExpressException("Event not found!");
            }

            var entity = _mapper.Map<InventoryDTO, Inventory>(inventoryDTO);
            entity.EventId = eventId;
            var result = Insert(entity);
            await _context.SaveChangesAsync();

            return result.Id;
        }

        public async Task<Guid> DeleteInventar(Guid id)
        {
            var inventar = _context.Inventories.Find(id);
            if (inventar == null)
            {
                throw new EventsExpressException("Not found");
            }

            var uei = _context.UserEventInventories.Where(ue => ue.InventoryId == id).ToArray();

            if (uei != null)
            {
                _context.UserEventInventories.RemoveRange(uei);
            }

            var result = _context.Inventories.Remove(inventar);
            await _context.SaveChangesAsync();

            return inventar.Id;
        }

        public async Task<Guid> EditInventar(InventoryDTO inventoryDTO)
        {
            var entity = _context.Inventories.Find(inventoryDTO.Id);
            if (entity == null)
            {
                throw new EventsExpressException("Object not found");
            }

            entity.ItemName = inventoryDTO.ItemName;
            if (entity.NeedQuantity > inventoryDTO.NeedQuantity)
            {
                var uei = _context.UserEventInventories.Where(ue => ue.InventoryId == inventoryDTO.Id).ToArray();

                if (uei != null)
                {
                    _context.UserEventInventories.RemoveRange(uei);
                }
            }

            entity.NeedQuantity = inventoryDTO.NeedQuantity;
            entity.UnitOfMeasuringId = inventoryDTO.UnitOfMeasuring.Id;
            await _context.SaveChangesAsync();

            return entity.Id;
        }

        public IEnumerable<InventoryDTO> GetInventar(Guid eventId)
        {
            if (!_context.Events.Any(x => x.Id == eventId))
            {
                return new List<InventoryDTO>();
            }

            return _mapper.Map<IEnumerable<InventoryDTO>>(
                _context.Inventories
                    .Include(i => i.UnitOfMeasuring)
                    .Where(i => i.EventId == eventId));
        }

        public InventoryDTO GetInventarById(Guid inventoryId)
        {
            var entity = _context.Inventories.Find(inventoryId);

            if (entity == null)
            {
                return new InventoryDTO();
            }

            return _mapper.Map<Inventory, InventoryDTO>(entity);
        }
    }
}
