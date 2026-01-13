using System;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Domain.Entities.Auditing;

namespace SecuritySystem.Employees
{
    /// <summary>
    /// Employee Domain Entity
    /// This is the core domain entity in the Domain layer
    /// </summary>
    public class Employee : FullAuditedAggregateRoot<Guid>
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

        [StringLength(512)]
        public string? Photo { get; set; }

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

        public RiskLevel RiskLevel { get; set; } = RiskLevel.Low;

        [StringLength(256)]
        public string? Supervisor { get; set; }

        public string? Notes { get; set; }

        public string? PerformanceNotes { get; set; }

        // Navigation properties for related entities (if needed)
        // public virtual ICollection<MedicalExam> MedicalExams { get; set; }
        // public virtual ICollection<Training> Trainings { get; set; }

        protected Employee()
        {
            // Protected constructor for ORM
        }

        public Employee(
            Guid id,
            string employeeId,
            string fullName,
            string email,
            string phone,
            string position,
            string department)
            : base(id)
        {
            EmployeeId = employeeId;
            FullName = fullName;
            Email = email;
            Phone = phone;
            Position = position;
            Department = department;
        }
    }

    public enum EmployeeStatus
    {
        Active = 1,
        OnLeave = 2,
        Terminated = 3,
        Candidate = 4
    }

    public enum RiskLevel
    {
        Low = 1,
        Medium = 2,
        High = 3
    }
}

