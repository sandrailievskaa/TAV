using Microsoft.AspNetCore.Mvc;
using TavSecuritySystem.Api.Models;
using TavSecuritySystem.Api.Models.Dtos;
using TavSecuritySystem.Api.Services;

namespace TavSecuritySystem.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
[Microsoft.AspNetCore.Authorization.AllowAnonymous]
public class ExampleEntityController : ControllerBase
{
    private readonly IExampleEntityService _service;

    public ExampleEntityController(IExampleEntityService service)
    {
        _service = service;
    }

    [HttpGet]
    [ProducesResponseType(typeof(PagedResponse<ExampleEntity>), StatusCodes.Status200OK)]
    public async Task<ActionResult<PagedResponse<ExampleEntity>>> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        var items = await _service.GetAllAsync(page, pageSize);
        var totalCount = await _service.GetTotalCountAsync();
        var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

        var response = new PagedResponse<ExampleEntity>
        {
            Items = items.ToList(),
            TotalCount = totalCount,
            PageNumber = page,
            PageSize = pageSize,
            TotalPages = totalPages
        };

        return Ok(response);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(ExampleEntity), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ExampleEntity>> GetById(Guid id)
    {
        var entity = await _service.GetByIdAsync(id);
        if (entity == null)
            return NotFound(new { message = $"Entity with ID {id} not found" });

        return Ok(entity);
    }

    [HttpPost]
    [ProducesResponseType(typeof(ExampleEntity), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ExampleEntity>> Create([FromBody] CreateExampleEntityDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var entity = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(ExampleEntity), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ExampleEntity>> Update(
        Guid id,
        [FromBody] UpdateExampleEntityDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var entity = await _service.UpdateAsync(id, dto);
        if (entity == null)
            return NotFound(new { message = $"Entity with ID {id} not found" });

        return Ok(entity);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _service.DeleteAsync(id);
        if (!result)
            return NotFound(new { message = $"Entity with ID {id} not found" });

        return NoContent();
    }
}

public class PagedResponse<T>
{
    public List<T> Items { get; set; } = new();
    public int TotalCount { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }
}
