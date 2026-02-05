using Imagekit.Sdk;
using Vizsgaremek.DTOs.UserDto;

public class ImageKitService
{
    private readonly ImagekitClient _imagekit;

    public ImageKitService(ImagekitClient imagekit)
    {
        _imagekit = imagekit;
    }

    public async Task<ImageDto> UploadImage(IFormFile file)
    {
        using var stream = file.OpenReadStream();
        using var memoryStream = new MemoryStream();
        await stream.CopyToAsync(memoryStream);

        var uploadRequest = new FileCreateRequest
        {
            file = memoryStream.ToArray(),
            fileName = file.FileName,
            folder = "/pictures",
            useUniqueFileName = true
        };

        var result = _imagekit.Upload(uploadRequest);

        if(result == null)
        {
            return new ImageDto
            {
                FileId = null,
                File = null
            };
        }
        return new ImageDto
        {
            Url = result.url,
            FileId = result.fileId
        };
    }

    public async Task<bool> DeleteImage(string fileId)
    {
        if (string.IsNullOrWhiteSpace(fileId))
            return false;

        var result = _imagekit.DeleteFile(fileId);

        return result != null;
    }
}