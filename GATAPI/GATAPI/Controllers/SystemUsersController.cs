using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using GATAPI.Models;

namespace GATAPI.Controllers
{
    public class SystemUsersController : ApiController
    {
        private GatEntities db = new GatEntities();

        // GET: api/SystemUsers
        public IQueryable<SystemUser> GetSystemUser()
        {
            return db.SystemUser;
        }

        // GET: api/SystemUsers/5
        [ResponseType(typeof(SystemUser))]
        public IHttpActionResult GetSystemUser(long id)
        {
            SystemUser systemUser = db.SystemUser.Find(id);
            if (systemUser == null)
            {
                return NotFound();
            }

            return Ok(systemUser);
        }

        // PUT: api/SystemUsers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSystemUser(long id, SystemUser systemUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != systemUser.UserId)
            {
                return BadRequest();
            }

            db.Entry(systemUser).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SystemUserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/SystemUsers
        [ResponseType(typeof(SystemUser))]
        public IHttpActionResult PostSystemUser(SystemUser systemUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.SystemUser.Add(systemUser);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = systemUser.UserId }, systemUser);
        }

        // DELETE: api/SystemUsers/5
        [ResponseType(typeof(SystemUser))]
        public IHttpActionResult DeleteSystemUser(long id)
        {
            SystemUser systemUser = db.SystemUser.Find(id);
            if (systemUser == null)
            {
                return NotFound();
            }

            db.SystemUser.Remove(systemUser);
            db.SaveChanges();

            return Ok(systemUser);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SystemUserExists(long id)
        {
            return db.SystemUser.Count(e => e.UserId == id) > 0;
        }
    }
}