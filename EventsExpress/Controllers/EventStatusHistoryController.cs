﻿using System;
using System.Threading.Tasks;
using EventsExpress.Core.IServices;
using EventsExpress.Filters;
using EventsExpress.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EventsExpress.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class EventStatusHistoryController : ControllerBase
    {
        private readonly IEventStatusHistoryService _eventStatusHistoryService;

        public EventStatusHistoryController(
            IEventStatusHistoryService eventStatusHistoryService)
        {
            _eventStatusHistoryService = eventStatusHistoryService;
        }

        /// <summary>
        /// This method is for event cancelation.
        /// </summary>
        /// <response code="200">Cancelation succesful.</response>
        /// <response code="400">Cancelation failed.</response>
        [HttpPost("{eventId:Guid}/[action]")]
        [UserAccessTypeFilter]
        public async Task<IActionResult> Cancel(Guid eventId, [FromBody]EventStatusHistoryViewModel eventStatus)
        {
            await _eventStatusHistoryService.CancelEvent(eventStatus.EventId, eventStatus.Reason);

            return Ok(eventStatus);
        }
    }
}
