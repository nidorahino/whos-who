export interface Track {
    albumImageUrl: string;
    preview_url: string; 
    songName: string;
    artists: string;
    songOptions: Array<string>;
    artistOptions: Array<string>;
};

export const defaultTrack: Track = {
    albumImageUrl: '',
    preview_url: '', 
    songName: '',
    artists: '',
    songOptions: [],
    artistOptions: [],
};