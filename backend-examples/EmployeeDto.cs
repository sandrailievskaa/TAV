using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace SecuritySystem.Employees
{
    /// <summary>
    /// Employee DTO - Used for returning employee data to clients
    /// Location: SecuritySystem.Application.Contracts/Employees/
    /// </summary>
    public class EmployeeDto : FullAuditedEntityDto<Guid>
    {
        public string EmployeeId { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? FatherName { get; set; }
        public string? PlaceOfBirth { get; set; }
        public string? Photo { get; set; }
        public string Position { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public string? Location { get; set; }
        public EmployeeStatus Status { get; set; }
        public DateTime? HireDate { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public DateTime? DateOfBirth { get; set; }
        public string Nationality { get; set; } = string.Empty;
        public RiskLevel RiskLevel { get; set; }
        public string? Supervisor { get; set; }
        public string? Notes { get; set; }
        public string? PerformanceNotes { get; set; }
    }

    /// <summary>
    /// DTO for creating a new employee
    /// </summary>
    public class CreateEmployeeDto
    {
        [Required]
        [StringLength(50)]
        public string EmployeeId { get; set; } = string.Empty;

        [Required]
        [StringLength(256)]
        public string FullName { get; set; } = string.Empty;

        [StringLength(128)]
        public string? FirstName { get; set; }

        [StringLength(128)]
        public string? LastName { get; set; }

        [StringLength(128)]
        public string? FatherName { get; set; }

        [StringLength(128)]
        public string? PlaceOfBirth { get; set; }

        [Required]
        [StringLength(256)]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Phone { get; set; } = string.Empty;

        [StringLength(512)]
        public string Address { get; set; } = string.Empty;

        public DateTime? DateOfBirth { get; set; }

        [StringLength(128)]
        public string Nationality { get; set; } = string.Empty;

        [Required]
        [StringLength(128)]
        public string Position { get; set; } = string.Empty;

        [Required]
        [StringLength(128)]
        public string Department { get; set; } = string.Empty;

        [StringLength(128)]
        public string? Location { get; set; }

        public EmployeeStatus Status { get; set; } = EmployeeStatus.Active;

        public DateTime? HireDate { get; set; }

        public RiskLevel RiskLevel { get; set; } = RiskLevel.Low;

        [StringLength(256)]
        public string? Supervisor { get; set; }

        public string? Notes { get; set; }
    }

    /// <summary>
    /// DTO for updating an existing employee
    /// </summary>
    public class UpdateEmployeeDto
    {
        [Required]
        [StringLength(256)]
        public string FullName { get; set; } = string.Empty;

        [StringLength(128)]
        public string? FirstName { get; set; }

        [StringLength(128)]
        public string? LastName { get; set; }

        [StringLength(128)]
        public string? FatherName { get; set; }

        [Required]
        [StringLength(256)]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Phone { get; set; } = string.Empty;

        [StringLength(512)]
        public string Address { get; set; } = string.Empty;

        public DateTime? DateOfBirth { get; set; }

        [StringLength(128)]
        public string Nationality { get; set; } = string.Empty;

        [Required]
        [StringLength(128)]
        public string Position { get; set; } = string.Empty;

        [Required]
        [StringLength(128)]
        public string Department { get; set; } = string.Empty;

        [StringLength(128)]
        public string? Location { get; set; }

        public EmployeeStatus Status { get; set; }

        public DateTime? HireDate { get; set; }

        public RiskLevel RiskLevel { get; set; }

        [StringLength(256)]
        public string? Supervisor { get; set; }

        public string? Notes { get; set; }

        public string? PerformanceNotes { get; set; }
    }

    /// <summary>
    /// Input DTO for getting paginated list of employees
    /// </summary>
    public class GetEmployeeListInput : PagedAndSortedResultRequestDto
    {
        public string? Filter { get; set; }
        public EmployeeStatus? Status { get; set; }
        public string? Department { get; set; }
    }
}

