export const getSavedAlbumIds = () => {
    const savedAlbums = localStorage.getItem("saved_albums")
      ? JSON.parse(localStorage.getItem("saved_albums"))
      : [];
  
    return savedAlbums;
  };
  
  export const saveAlbumIds = (albumIdArr) => {
    if (albumIdArr) {
      localStorage.setItem("saved_albums", JSON.stringify(albumIdArr));
    } else {
      localStorage.removeItem("saved_albums");
    }
  };
  
  export const removeAlbumIds = (albumId) => {
    const savedAlbums = localStorage.getItem("saved_albums")
      ? JSON.parse(localStorage.getItem("saved_albums"))
      : null;
  
    if (!savedAlbums) {
      return false;
    }
  
    const updatedSavedAlbums = savedAlbums?.filter(
      (savedAlbumId) => savedAlbumId !== albumId
    );
    localStorage.setItem("saved_albums", JSON.stringify(updatedSavedAlbums));
  
    return true;
  };