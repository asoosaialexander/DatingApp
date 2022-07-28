using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _dataContext;

        public BuggyController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetAuth()
        {
            return "restricted data";
        }

        [HttpGet("not-found")]
        public ActionResult<string> GetNotFound()
        {
            var user = _dataContext.Users.Find(-1);
            if (user == null) return NotFound();
            return "found user";
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            var user = _dataContext.Users.Find(-1);
            return user.ToString();
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("this is not a good request");
        }
    }
}