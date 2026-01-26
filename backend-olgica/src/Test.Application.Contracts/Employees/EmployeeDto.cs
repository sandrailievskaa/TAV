using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Test.Shared;
using Volo.Abp.Application.Dtos;

namespace Test.Employees;

public class EmployeeDto : AuditedEntityDto<Guid>
{
    public string EmployeeId { get; set; } = null!;
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string FullName { get; set; } = null!;
    public string? FatherName { get; set; }
    public string? PlaceOfBirth { get; set; }
    public string? Photo { get; set; }
    public string Position { get; set; } = null!;
    public string Department { get; set; } = null!;
    public string? Location { get; set; }
    public EmployeeStatus Status { get; set; }
    public DateTime? HireDate { get; set; }
    public string Email { get; set; } = null!;
    public string Phone { get; set; } = null!;
    public string Address { get; set; } = null!;
    public DateTime DateOfBirth { get; set; }
    public string Nationality { get; set; } = null!;
    public List<string> Qualifications { get; set; } = new();
    public RiskLevel RiskLevel { get; set; }
    public string? Supervisor { get; set; }
    public string? Notes { get; set; }
    public string? PerformanceNotes { get; set; }
}

public class CreateUpdateEmployeeDto
{
    [Required]
    [StringLength(50)]
    public string EmployeeId { get; set; } = null!;

    [Required]
    [StringLength(100)]
    public string FirstName { get; set; } = null!;

    [Required]
    [StringLength(100)]
    public string LastName { get; set; } = null!;

    [StringLength(100)]
    public string? FatherName { get; set; }

    [StringLength(100)]
    public string? PlaceOfBirth { get; set; }

    public string? Photo { get; set; }

    [Required]
    [StringLength(100)]
    public string Position { get; set; } = null!;

    [Required]
    [StringLength(100)]
    public string Department { get; set; } = null!;

    [StringLength(100)]
    public string? Location { get; set; }

    public EmployeeStatus Status { get; set; }
    public DateTime? HireDate { get; set; }

    [Required]
    [EmailAddress]
    [StringLength(200)]
    public string Email { get; set; } = null!;

    [Required]
    [StringLength(50)]
    public string Phone { get; set; } = null!;

    [Required]
    [StringLength(500)]
    public string Address { get; set; } = null!;

    [Required]
    public DateTime DateOfBirth { get; set; }

    [Required]
    [StringLength(100)]
    public string Nationality { get; set; } = null!;

    public List<string>? Qualifications { get; set; }
    public RiskLevel RiskLevel { get; set; }
    public string? Supervisor { get; set; }
    public string? Notes { get; set; }
    public string? PerformanceNotes { get; set; }
}

public class GetEmployeeListDto : PagedAndSortedResultRequestDto
{
    public string? Filter { get; set; }
    public string? Department { get; set; }
    public EmployeeStatus? Status { get; set; }
    public RiskLevel? RiskLevel { get; set; }
}

