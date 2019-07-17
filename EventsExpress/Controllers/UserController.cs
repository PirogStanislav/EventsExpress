﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using EventsExpress.Core.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EventsExpress.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;
        private IMapper _mapper;

        public UsersController(IUserService userSrv, IMapper mapper)
        {
            _userService = userSrv;
            _mapper = mapper;
        }


        [HttpGet]
        public IActionResult Get()
        {
            var users = _userService.GetAll();

            return Ok(users);
        }

        [HttpGet("blocked")]
        public IActionResult GetBlockedUsers()
        {
            var users = _userService.Get(u => u.IsBlocked);

            return Ok(users);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> ChangeRole(Guid userId, Guid roleId)
        {
            var result = await _userService.ChangeRole(userId, roleId);
            if (!result.Successed)
            {
                return BadRequest(result.Message);
            }
            return Ok();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> ChangeRole(Guid userId)
        {

            var result = await _userService.Unblock(userId);

            if (!result.Successed)
            {
                return BadRequest(result.Message);
            }
            return Ok();
        }
    }
}