import React from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';
import {
    DataGrid
} from "@material-ui/data-grid";
import {
    Link,
} from "react-router-dom";
class Landing extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
    }
    componentDidMount(){
        var access_token = localStorage.getItem('spotify_token');
        if(access_token !== null){
            axios.get('https://api.spotify.com/v1/me/tracks?limit=50', {
                headers: {
                    "Authorization": "Bearer " + access_token
                }
            }).then(res => {
                this.setState({
                    data: res.data.items
                })
            })
        }
    }

    renderRows(){
        var data = this.state.data;
        var dataTable = [];
        if (data.length !== 0){
            console.log(data);
            for(var i = 0; i < data.length; i++){
                dataTable.push({});
                dataTable[i].id = i + 1;
                dataTable[i].spotifyID = data[i].track.id
                dataTable[i].artistName = data[i].track.artists[0].name;
                dataTable[i].trackName = data[i].track.name;
                dataTable[i].popularity = data[i].track.popularity;
            }

            const columns = [
                { field: 'id', headerName: 'ID', width: 100 },
                { field: 'spotifyID', headerName: 'Spotify ID', width: 400 },
                { field: 'artistName', headerName: 'Artist name', width: 400 },
                { field: 'trackName', headerName: 'Track name', width: 400 },
                { field: 'popularity', headerName: 'Popularity', type: 'number', width: 300 },
                {
                    field: "",
                    headerName: "Analyse",
                    sortable: false,
                    width: 200,
                    disableClickEventBubbling: true,
                    renderCell: (params: GridCellParams) => (
                        <strong>
                            <Link to={"/track/" + params.getValue("spotifyID")}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    style={{ marginLeft: 16 }}
                                >
                                    Scan
                                </Button>
                            </Link>
                        </strong>
                    ),
                },
            ];
            console.log(dataTable);
            return(
                <div style={{ height: '100vh', width: '100%' }}>
                    <DataGrid rows={dataTable} columns={columns} pageSize={50} />
                </div>
            )
        }else{
            return(
                <div>Loading!</div>
            )
        }
    }

    render() {
        return(
            this.renderRows()
        )
    }
}

export default Landing;
