using Imagekit.Sdk;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;
using Vizsgaremek.DTOs.UserDto;

public class ImageKitService
{
    private readonly ImagekitClient _imagekit;

    public ImageKitService(ImagekitClient imagekit)
    {
        _imagekit = imagekit;
    }

    public async Task<ProfilePictureDto> UploadImage(IFormFile file)
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
            return new ProfilePictureDto
            {
                FileId = null,
                File = null
            };
        }
        return new ProfilePictureDto
        {
            Url = result.url,
            FileId = result.fileId
        };
    }
}
