using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Arralyn.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DataController : ControllerBase
    {
        private readonly ILogger<DataController> _logger;

        public DataController(ILogger<DataController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get()
        {
            DirectoryInfo directory = new DirectoryInfo("C:\\Users\\Peter\\Documents\\Projects\\arralyn\\data");
            FileInfo file = directory.GetFiles().OrderByDescending(x => x.LastWriteTime).First();

            object data;
            using (StreamReader sr = new StreamReader(file.OpenRead()))
            {
                data = JsonSerializer.Deserialize<object>("{\"status\":\"OK\",\"data\":" + sr.ReadToEnd() + "}");
            }

            return new JsonResult(data);
        }

        [HttpPut]
        public IActionResult Put(object data)
        {
            using (StreamWriter sw = new StreamWriter("C:\\Users\\Peter\\Documents\\Projects\\arralyn\\data\\data-" + DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss") + ".json"))
            {
                sw.WriteLine(data);
            }

            return new OkResult();
        }
    }
}
