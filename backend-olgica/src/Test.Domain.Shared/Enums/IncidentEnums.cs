namespace Test.Shared;

public enum IncidentType
{
    Injury = 0,
    Incident = 1,
    NearMiss = 2
}

public enum Severity
{
    Minor = 0,
    Moderate = 1,
    Serious = 2,
    Critical = 3
}

public enum IncidentStatus
{
    Reported = 0,
    UnderInvestigation = 1,
    Resolved = 2,
    Closed = 3
}

public enum TreatmentType
{
    NoTreatment = 0,
    FirstAid = 1,
    MedicalTreatment = 2,
    Hospitalization = 3
}

public enum ActionStatus
{
    Pending = 0,
    Completed = 1
}

