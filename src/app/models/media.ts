export class Media {

    attribution = '';
    caption = { id: '', text: '', created_time: '', from: { } };
    comments = { count: 0 };
    created_time = '';
    filter = '';
    id = '';
    images: { thumbnail: { url: '' }, low_resolution: { url: '' }, standard_resolution: { url: '' } };
    likes = { count: 0 };
    link = '';
    location = { latitude: 0, longitude: 0, name: '', id: 0 };
    tags = [];
    type = '';
    user = { id: '', full_name: '', profile_picture: '', username: '' };
    user_has_liked = false;
    users_in_photo = [];

}
