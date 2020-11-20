﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using EventsExpress.Core.DTOs;
using EventsExpress.Core.Infrastructure;
using EventsExpress.Core.IServices;
using EventsExpress.Core.Notifications;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace EventsExpress.Core.HostedService
{
    public class SendMessageHostedService : BackgroundService
    {
        private readonly ILogger<SendMessageHostedService> _logger;
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public SendMessageHostedService(
            IServiceProvider services,
            ILogger<SendMessageHostedService> logger,
            IMediator mediator,
            IMapper mapper)
        {
            Services = services;
            _logger = logger;
            _mediator = mediator;
            _mapper = mapper;
        }

        public IServiceProvider Services { get; }

        private async Task DoWork(CancellationToken stoppingToken)
        {
            using (var scope = Services.CreateScope())
            {
                var scopedProcessingService =
                    scope.ServiceProvider
                        .GetRequiredService<IOccurenceEventService>();

                while (!stoppingToken.IsCancellationRequested)
                {
                    var events = scopedProcessingService.GetUrgentOccurenceEvents();
                    try
                    {
                        foreach (var ev in events)
                        {
                            await _mediator.Publish(new CreateEventVerificationMessage(_mapper.Map<OccurenceEventDTO>(ev)));
                        }
                    }
                    catch (Exception ex)
                    {
                        new OperationResult(false, ex.Message, string.Empty);
                    }

                    await Task.Delay(1000 * 60 * 60 * 24, stoppingToken);

                    _logger.LogInformation("Message Hosted Service is working.");
                }
            }
        }

        public override async Task StopAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation(
            "Message Service Hosted Service is stopping.");

            await base.StopAsync(stoppingToken);
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation(
            "Message Service Hosted Service running.");

            await DoWork(stoppingToken);
        }
    }
}
