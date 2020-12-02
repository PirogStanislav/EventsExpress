﻿using EventsExpress.Core.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace EventsExpress.Filters
{
    public class EventsExpressExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            if (context.Result is EventsExpressException eventsExpressException)
            {
                context.ModelState.AddModelError(string.Empty, eventsExpressException.Message);
                var result = new ObjectResult(context.ModelState) { StatusCode = 400 };
                context.Result = result;
                context.ExceptionHandled = true;
            }
            else
            {
                string message = "Unhandled exception occurred. Please try again. " +
                    "If this error persists - contact system administrator.";
                context.ModelState.AddModelError(string.Empty, message);
                var result = new ObjectResult(context.ModelState) { StatusCode = 500 };
                context.Result = result;
                context.ExceptionHandled = true;
            }
        }
    }
}