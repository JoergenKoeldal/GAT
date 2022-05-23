using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GatApi.Controllers;
using GatApi.Data;
using GatApi.Models;
using GatApi.Services;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace GatApiTests
{
    public class SourceControllerTest
    {
        public readonly SourcesController sourcesController;
        public readonly GatApiContext context;

        public List<Source> Sources { get; set; } = new List<Source>();

        //The constructor is called after each test, which makes it the "setup" call in Xunit
        public SourceControllerTest()
        {
            //Use an in memory database for the testing **This overrides the default GatApiContext builder set in program.cs
            var dbContextOptions = new DbContextOptionsBuilder<GatApiContext>()
            .UseInMemoryDatabase(databaseName: "TestDb")
            .Options;

            context = new GatApiContext(dbContextOptions);

            //Empty the database between tests
            context.Database.EnsureDeleted();

            //Create the database once again
            context.Database.EnsureCreated();
            

            sourcesController = new SourcesController(context);

            AddSourcesToDb();

            //To remove the cache from the objects after they are added.
            context.ChangeTracker.Clear();

        }

        //Populate the db with some data
        public async void AddSourcesToDb()
        {
            Sources = new List<Source>
            {
                new Source{ SourceId = 1, Name = "test1"},
                new Source{ SourceId = 2, Name = "test2"},
                new Source{ SourceId = 3, Name = "test3"},
                new Source{ SourceId = 4, Name = "test4"},
            };

            foreach (var source in Sources)
            {
                await sourcesController.PostSource(source);
            }
        }


        [Fact]
        public async void GetSources()
        {
            var sources = await sourcesController.GetSources();

            var actualSourceCount = sources.Value.Count();

            Assert.Equal(Sources.Count, actualSourceCount);
        }
        [Fact]
        public async void PostSource()
        {

            Source source = new Source { SourceId = 5, Name = "test5" };
            await sourcesController.PostSource(source);
            var actualSourceCount = await context.Source.CountAsync();
            Assert.Equal(Sources.Count + 1, actualSourceCount);
        }

        [Fact]
        public async void GetSource()
        {
            var source = await sourcesController.GetSources(3);

            Assert.Equal("test3", source.Value.Name);
            
        }

        [Fact]
        public async void PutSource()
        {
            Source source = new Source
            {
                SourceId = 2,
                Name = "ChangedName"
            };

            await sourcesController.PutSource(2, source);

            Source? changedSource = context.Source.Where(x => x.SourceId == source.SourceId).FirstOrDefault();

            Assert.Equal(source.Name, changedSource.Name);
        }

        [Fact]
        public async void DeleteSource()
        {
            int beforeSourceCount = await context.Source.CountAsync();

            await sourcesController.DeleteSource(4);

            int afterSourceCount = await context.Source.CountAsync();

            Assert.Equal(beforeSourceCount - 1, afterSourceCount);
        }
    }
}
