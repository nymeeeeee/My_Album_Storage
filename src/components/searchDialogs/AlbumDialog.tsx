import React, { useState } from 'react';
import styled from 'styled-components';
import AlbumBox from './AlbumBox';
import SearchAlbumForm from './SearchAlbumForm';
import SelectedAlbumBox from './SelectedAlbumBox';
import AlbumDialogController from './AlbumDialogController';
import { albumType } from '../../store/album';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

const AlbumDialog: React.FC = () => {
  //선택된 앨범 정보
  const [selectedAlbums, setSelectedAlbums] = useState([] as albumType[]);
  //검색된 앨범 정보
  const { searchAlbums } = useSelector((state: RootState) => state.albumStore);
  return (
    <DialogBackground>
      <AlbumDialogContainer>
        <SearchAlbumForm></SearchAlbumForm>
        <SelectedAlbumContainer>
          {
            selectedAlbums.map(album => <SelectedAlbumBox
              album={album}
              selectedAlbums={selectedAlbums} 
              setSelectedAlbums={setSelectedAlbums} 
            ></SelectedAlbumBox>)
          }
        </SelectedAlbumContainer>
        <AlbumViewer>
          {
            searchAlbums.map(
              album => <AlbumBox 
                selectedAlbums={selectedAlbums} 
                setSelectedAlbums={setSelectedAlbums} 
                key={album.id} 
                album={album}
              ></AlbumBox>
            )
          }
        </AlbumViewer>
        <AlbumDialogController></AlbumDialogController>
      </AlbumDialogContainer>
    </DialogBackground>
  );
};
const Centering = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;

const SelectedAlbumContainer = styled.div`
width: 90%;
height: 20%;
background-color: #a9e6d7;
border-radius: 20px;
box-shadow: 0 8px 8px 0 gray;
display: flex;
flex-direction: row;
align-items: center;
flex-wrap: nowrap;
overflow-x: scroll;
::-webkit-scrollbar {
    width: 10px;  /* 스크롤바의 너비 */
}
::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: #217af4; /* 스크롤바의 색상 */
    border-radius: 10px;
}
`;

const AlbumDialogContainer = styled(Centering)`
flex-direction: column;
width: 84vw;
height: 80vh;
border-radius: 25px;
background-color: white;
box-shadow: 0 8px 8px 0 gray;
`;

const AlbumViewer = styled.div`
border: 3px solid black;
border-radius: 20px;
margin-top: 8px;
display: flex;
flex-wrap: wrap;
overflow-y: scroll;
width: 90%;
height: 60%;
::-webkit-scrollbar {
    display: none;
}
`;

const DialogBackground = styled(Centering)`
position: absolute;
background-color: rgba(0, 0, 0, 0.4);
width: 100vw;
height: 100vh;
top: 0;
left: 0;
`;

export default AlbumDialog;