using System;
using System.Collections.Generic;
using Test.MedicalExaminations;
using Test.Trainings;
using Test.PPE;
using Test.Documents;
using Test.Shared;
using Volo.Abp.Domain.Entities.Auditing;

namespace Test.Employees;

public class Employee : AuditedAggregateRoot<Guid>
{
    public string EmployeeId { get; set; } = null!;
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
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
    public string? Qualifications { get; set; } // JSON array stored as string
    public RiskLevel RiskLevel { get; set; }
    public string? Supervisor { get; set; }
    public string? Notes { get; set; }
    public string? PerformanceNotes { get; set; }

    // Navigation properties
    public virtual ICollection<MedicalExamination> MedicalExaminations { get; set; }
    public virtual ICollection<Training> Trainings { get; set; }
    public virtual ICollection<EmployeePPE> AssignedPPE { get; set; }
    public virtual ICollection<EmployeeDocument> Documents { get; set; }

    protected Employee()
    {
        MedicalExaminations = new List<MedicalExamination>();
        Trainings = new List<Training>();
        AssignedPPE = new List<EmployeePPE>();
        Documents = new List<EmployeeDocument>();
    }

    public Employee(
        Guid id,
        string employeeId,
        string firstName,
        string lastName,
        string position,
        string department,
        string email,
        string phone,
        string address,
        DateTime dateOfBirth,
        string nationality) : base(id)
    {
        EmployeeId = employeeId;
        FirstName = firstName;
        LastName = lastName;
        Position = position;
        Department = department;
        Email = email;
        Phone = phone;
        Address = address;
        DateOfBirth = dateOfBirth;
        Nationality = nationality;
        Status = EmployeeStatus.Active;
        RiskLevel = RiskLevel.Medium;
        
        MedicalExaminations = new List<MedicalExamination>();
        Trainings = new List<Training>();
        AssignedPPE = new List<EmployeePPE>();
        Documents = new List<EmployeeDocument>();
    }

    public string FullName => $"{FirstName} {LastName}";
}

