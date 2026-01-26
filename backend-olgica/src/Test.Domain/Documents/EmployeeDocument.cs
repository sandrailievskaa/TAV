using System;
using Test.Employees;
using Test.Shared;
using Volo.Abp.Domain.Entities.Auditing;

namespace Test.Documents;

public class EmployeeDocument : AuditedAggregateRoot<Guid>
{
    public Guid EmployeeId { get; set; }
    public virtual Employee Employee { get; set; } = null!;
    public string DocumentName { get; set; } = null!;
    public DocumentType DocumentType { get; set; }
    public string FileSize { get; set; } = null!;
    public string? FilePath { get; set; }

    protected EmployeeDocument()
    {
    }

    public EmployeeDocument(
        Guid id,
        Guid employeeId,
        string documentName,
        DocumentType documentType,
        string fileSize) : base(id)
    {
        EmployeeId = employeeId;
        DocumentName = documentName;
        DocumentType = documentType;
        FileSize = fileSize;
    }
}

