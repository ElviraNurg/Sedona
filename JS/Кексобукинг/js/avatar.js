const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const preview = document.querySelector('.ad-form-header__preview img');
const fileChooserPhoto = document.querySelector('.ad-form__upload input[type=file]');
const previewPhoto = document.querySelector('.ad-form__photo');

fileChooserAvatar.addEventListener('change', () =>{
  const file = fileChooserAvatar.files[0];
  const fileName = file.name.toLowerCase();
  const maches = FILE_TYPES.some((it) =>{
    return fileName.endsWith(it)
  });
  if (maches){
    const reader  = new FileReader();
    reader.addEventListener('load', () =>{
      preview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
})

fileChooserPhoto.addEventListener('change', () =>{
  const file = fileChooserPhoto.files[0];
  const fileName = file.name.toLowerCase();
  const maches = FILE_TYPES.some((it) =>{
    return fileName.endsWith(it)
  });
  if (maches){
    const reader  = new FileReader();
    reader.addEventListener('load', () =>{
      previewPhoto.appendChild(preview.cloneNode());
      const previewPhotoImg = previewPhoto.querySelector('img');
      previewPhotoImg.removeAttribute('width', 'height')
      previewPhotoImg.src = reader.result;
      previewPhotoImg.width = '70';
      previewPhotoImg.height = '70';
    });
    reader.readAsDataURL(file);
  }
})
