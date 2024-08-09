// src/store/useStore.js
import create from 'zustand';

const useStore = create((set) => ({
  likedTracks: JSON.parse(localStorage.getItem('likedTracks')) || [],
  toggleLike: (track) => set((state) => {
    const isLiked = state.likedTracks.some((likedTrack) => likedTrack.id === track.id);
    let updatedTracks;
    
    if (isLiked) {
      updatedTracks = state.likedTracks.filter((likedTrack) => likedTrack.id !== track.id);
    } else {
      updatedTracks = [...state.likedTracks, track];
    }
    
    localStorage.setItem('likedTracks', JSON.stringify(updatedTracks));
    return { likedTracks: updatedTracks };
  }),
}));

export default useStore;
