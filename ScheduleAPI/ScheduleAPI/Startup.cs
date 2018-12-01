using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ScheduleAPI.Services;

namespace ScheduleAPI
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                      builder => {
                          builder.WithOrigins("http://localhost:3000")
                                 .AllowAnyMethod().AllowAnyHeader();
                      });
            });
            var connectionString =
                "Data Source = (LocalDB)\\MSSQLLocalDB; AttachDbFilename = D:\\Projects\\ScheduleWithApi\\ScheduleAPI\\ScheduleDB\\ScheduleDB.mdf; Integrated Security = True";
            services
                .AddDbContext<ScheduleDbContext>(o =>
                    o.UseSqlServer(connectionString)
                );
            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        public void Configure(IApplicationBuilder app,
            IHostingEnvironment env,
            ScheduleDbContext scheduleDbContext)
        {
            app.UseCors("AllowSpecificOrigin");
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseHttpsRedirection();

            app.UseMvc();
        }
    }
}
