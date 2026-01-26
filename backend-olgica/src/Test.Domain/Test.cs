using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Domain.Entities.Auditing;

namespace Test
{
    public class Test : AuditedAggregateRoot<Guid>
    {
        public string? Name { get; set; }
        public int Age { get; set; }

        protected Test()
        {
        }
        public Test(Guid id, string name, int age) : base(id)
        {
            Name = name;
            Age = age;
        }
    }
}
