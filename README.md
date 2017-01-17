# KairosAPI Package
Add emotion analysis and face recognition functionality.
* Domain: 
* Credentials: appKey, appId

## How to get credentials: 
You can create and manage your API Keys via your [dashboard](https://developer.kairos.com/admin). It's free to sign-up and start testing.
1. Switch to `APPLICATIONS` endpoint.
2. Click on **Create New Application** button.
3. Fill in Application Name and Application Description fields and click on **Create Application** button.
4. Use **Application ID** as `appId` and one of **Application Keys** as `appKey`.

## KairosAPI.getEmotionalAnalysisAnalytics
Returns the overall impressions from a specific uploaded piece of media.

| Field    | Type       | Description
|----------|------------|----------
| appId    | credentials| Kairos Application ID.
| appKey   | credentials| Kairos Application Key.
| id       | String     | The id of the media.

## KairosAPI.createEmotionalAnalysis
Create a new media object to be processed.

| Field    | Type       | Description
|----------|------------|----------
| appId    | credentials| Kairos Application ID.
| appKey   | credentials| Kairos Application Key.
| source   | File       | The source of the media. URL or file upload.
| landmarks| String     | Set to 1 to receive the feature points, such as eyes, nose, mouth locations, in the JSON response.
| timeout  | String     | Set timeout in seconds to wait for the media to be processed. Default timeout is 10 seconds. Max timeout allowed is 60 seconds.

## KairosAPI.getEmotionalAnalysis
Returns the results of a specific uploaded piece of media.

| Field    | Type       | Description
|----------|------------|----------
| appId    | credentials| Kairos Application ID.
| appKey   | credentials| Kairos Application Key.
| id       | String     | The id of the media.

## KairosAPI.deleteEmotionalAnalysis
Delete media results. It returns the status of the operation.

| Field    | Type       | Description
|----------|------------|----------
| appId    | credentials| Kairos Application ID.
| appKey   | credentials| Kairos Application Key.
| id       | String     | The id of the media.

## KairosAPI.addFacesToGallery
Takes a photo, finds the faces within it, and stores the faces into a gallery you create.

To enroll someone into a gallery, all you need to do is submit a JPG or PNG photo. You can submit the photo either as a publicly accessible URL or Base64 encoded.

Next you need to choose an identifier for the person being enrolled. The identifier could be their name ("Bob"), something unique to your app ("ABC123xyz"), or anything meaningful for you. We call that identifier "subject_id".

You also need to pick a name for the gallery we are storing your faces in. We`ve called this "gallery_name". If you had used that gallery name before, we will just add your new face to it, otherwise we will create a new gallery for you.

Finally, we have some advanced options available for your use. We have set these options to sensible defaults, but sometimes there is a need to override them and we have provided that facility for you.

| Field          | Type       | Description
|----------------|------------|----------
| appId          | credentials| Kairos Application ID.
| appKey         | credentials| Kairos Application Key.
| image          | File       | Publicly accessible URL, Base64 encoded string or File.
| subjectId      | String     | Defined by you. Is used as an identifier for the face.
| galleryName    | String     | Defined by you. Is used to identify the gallery.
| minHeadScale   | String     | Defined by you. Is used to set the ratio of the smallest face we should look for in the photo. Accepts a value between .015 (1:64 scale) and .5 (1:2 scale). By default it is set at .015 (1:64 scale) if not specified.
| multipleFaces  | String     | If set to true, every face found in your photo will be enrolled under the same `subjectId`.

## KairosAPI.compareFaces
Takes a photo, finds the face within it, and tries to compare it against a face you have already enrolled into a gallery.

To verify a face that you have enrolled in your gallery, all you need to do is submit a JPG or PNG photo. You can submit the photo either as a publicly accessible URL or Base64 encoded.

Next, specify which gallery and subject we should search against to compare. These are the same names you used previously during the /enroll calls to create the gallery.

> Note: As long as the request is able to perform a match then you will receive a status of "success". You should use the "confidence" value to determine whether the comparison is valid for your application. We find that confidence values in excess of 60% are almost always of the same person.

| Field          | Type       | Description
|----------------|------------|----------
| appId          | credentials| Kairos Application ID.
| appKey         | credentials| Kairos Application Key.
| image          | File       | Publicly accessible URL, Base64 encoded string or File.
| subjectId      | String     | Defined by you. Is used as an identifier for the face.
| galleryName    | String     | Defined by you. Is used to identify the gallery.

## KairosAPI.recognizeFaces
Takes a photo, finds the faces within it, and tries to match them against the faces you have already enrolled into a gallery.

To match someone to a face enrolled in your gallery, all you need to do is submit a JPG or PNG photo. You can submit the photo either as a publicly accessible URL or Base64 encoded.

Next, specify which gallery we should search against for matches. This is the same name you used previously during the /enroll calls to create the gallery.

We have the concept of a matching threshold, which by default is set at 60%. If the face you submit is 60% similar to one or more faces in your gallery we will return that as a list of potential candidates and how closely they match. If no one falls in that range we will return no matches.

Depending on your usage, you may want to adjust the threshold lower or higher to return more or less potential candidates respectively.

Finally, we have some advanced options available for your use. We have set these options to sensible defaults, but sometimes there is a need to override them and we have provided that facility for you.

| Field          | Type       | Description
|----------------|------------|----------
| appId          | credentials| Kairos Application ID.
| appKey         | credentials| Kairos Application Key.
| image          | File       | Publicly accessible URL, Base64 encoded string or File.
| galleryName    | String     | Defined by you. Is used to identify the gallery.
| minHeadScale   | String     | Defined by you. Is used to set the ratio of the smallest face we should look for in the photo. Accepts a value between .015 (1:64 scale) and .5 (1:2 scale). By default it is set at .015 (1:64 scale) if not specified.
| threshold      | String     | Is used to determine a valid facial match.
| maxNumResults  | String     | Is the maximum number of potential matches that are returned. By default it is set to 10 if not supplied.

## KairosAPI.detectFaces
Takes a photo and returns the facial features it finds.

To detect faces, all you need to do is submit a JPG or PNG photo. You can submit the photo either as a publicly accessible URL or Base64 encoded.

Finally, we have some advanced options available for your use. We have set these options to sensible defaults, but sometimes there is a need to override them and we have provided that facility for you.

One additional thing to note is that the returned coordinates all begin at the top left of the photo.

| Field       | Type       | Description
|-------------|------------|----------
| appId       | credentials| Kairos Application ID.
| appKey      | credentials| Kairos Application Key.
| image       | File       | Publicly accessible URL, Base64 encoded string or File.
| minHeadScale| String     | Defined by you. Is used to set the ratio of the smallest face we should look for in the photo. Accepts a value between .015 (1:64 scale) and .5 (1:2 scale). By default it is set at .015 (1:64 scale) if not specified.

## KairosAPI.getGalleries
Lists out all of the galleries you have created.

| Field    | Type       | Description
|----------|------------|----------
| appId    | credentials| Kairos Application ID.
| appKey   | credentials| Kairos Application Key.

## KairosAPI.getSingleGalleryFaces
Lists out all of the faces you have enrolled in a gallery.

| Field          | Type       | Description
|----------------|------------|----------
| appId          | credentials| Kairos Application ID.
| appKey         | credentials| Kairos Application Key.
| galleryName    | String     | Defined by you. Is used to identify the gallery.

## KairosAPI.deleteSingleGallery
Removes a gallery and all of its subjects.

| Field          | Type       | Description
|----------------|------------|----------
| appId          | credentials| Kairos Application ID.
| appKey         | credentials| Kairos Application Key.
| galleryName    | String     | Defined by you. Is used to identify the gallery.

## KairosAPI.deleteFaceFromGallery
Removes a face you have enrolled within a gallery.

| Field          | Type       | Description
|----------------|------------|----------
| appId          | credentials| Kairos Application ID.
| appKey         | credentials| Kairos Application Key.
| subjectId      | String     | Defined by you. Is used as an identifier for the face.
| galleryName    | String     | Defined by you. Is used to identify the gallery.

