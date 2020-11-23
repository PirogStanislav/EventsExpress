﻿using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using EventsExpress.Core.DTOs;
using EventsExpress.Core.Extensions;
using EventsExpress.Core.Infrastructure;
using EventsExpress.Core.IServices;
using EventsExpress.Core.Notifications;
using MediatR;
using Microsoft.Extensions.Logging;

namespace EventsExpress.Core.NotificationHandlers
{
    public class CreateEventVerificationHandler : INotificationHandler<CreateEventVerificationMessage>
    {
        private readonly ILogger<CreateEventVerificationHandler> _logger;
        private readonly IEmailService _sender;
        private readonly IUserService _userService;

        public CreateEventVerificationHandler(
            ILogger<CreateEventVerificationHandler> logger,
            IEmailService sender,
            IUserService userService)
        {
            _logger = logger;
            _sender = sender;
            _userService = userService;
        }

        public async Task Handle(CreateEventVerificationMessage notification, CancellationToken cancellationToken)
        {
            var user = _userService.GetById(notification.EventSchedule.CreatedBy);

            try
            {
                string link = $"{AppHttpContext.AppBaseUrl}/eventSchedule/{notification.EventSchedule.Id}";
                await _sender.SendEmailAsync(new EmailDTO
                {
                    Subject = "Aprove your reccurent event!",
                    RecepientEmail = user.Email,
                    MessageText = $"Follow the <a href='{link}'>link</a> to create the reccurent event.",
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
        }
    }
}