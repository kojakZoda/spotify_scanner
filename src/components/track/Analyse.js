import React from 'react';
import { withRouter } from "react-router";
import axios from "axios";
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class Analyse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            track: {}
        }
    }
    componentDidMount(){
        var access_token = localStorage.getItem('spotify_token');
        const id = this.props.match.params.id;
        console.log(id);
        axios.get('https://api.spotify.com/v1/audio-features?ids='+id, {
            headers: {
                "Authorization": "Bearer " + access_token
            }
        }).then(res => {
            console.log(res.data.audio_features[0]);
            this.setState({
                data: res.data.audio_features[0],
            })
        })
        axios.get('https://api.spotify.com/v1/tracks/' + id, {
            headers: {
                "Authorization": "Bearer " + access_token
            }
        }).then(res => {
            console.log(res.data);
            this.setState({
                track: res.data,
            })
        })
    }
    
    render() {
        var track = this.state.data;
        var trackInfo = this.state.track;
        var minutes = Math.floor(track.duration_ms / 60000);
        var seconds = ((track.duration_ms % 60000) / 1000).toFixed(0);
        var realDuration = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        return(
            <Container maxWidth="xl">
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Card >
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    {trackInfo.name}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {realDuration}
                                </Typography>
                                <Typography color="textSecondary">
                                    BPM : {track.tempo}
                                </Typography>
                                <Typography variant="body2" >
                                    Key : {track.key}<br/>
                                    Mode : {track.mode}<br />
                                    Time Signature : {track.time_signature}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card >
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Acousticness : {track.acousticness}
                                </Typography>
                                <Typography color="textSecondary">
                                    <LinearProgress variant="determinate" value={track.acousticness * 100} />
                                </Typography>
                                <Typography color="textSecondary" >
                                    A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card >
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Danceability : {track.danceability}
                                </Typography>
                                <Typography color="textSecondary">
                                    <LinearProgress variant="determinate" value={track.danceability * 100} />
                                </Typography>
                                <Typography color="textSecondary" >
                                    Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card >
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Energy : {track.energy}
                                </Typography>
                                <Typography color="textSecondary">
                                    <LinearProgress variant="determinate" value={track.energy * 100} />
                                </Typography>
                                <Typography color="textSecondary" >
                                    Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card >
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Instrumentalness : {track.instrumentalness}
                                </Typography>
                                <Typography color="textSecondary">
                                    <LinearProgress variant="determinate" value={track.instrumentalness * 100} />
                                </Typography>
                                <Typography color="textSecondary" >
                                    Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card >
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Liveness : {track.liveness}
                                </Typography>
                                <Typography color="textSecondary">
                                    <LinearProgress variant="determinate" value={track.liveness * 100} />
                                </Typography>
                                <Typography color="textSecondary" >
                                    Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card >
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Loudness : {track.loudness}
                                </Typography>
                                <Typography color="textSecondary">
                                    <LinearProgress variant="determinate" value={track.loudness * 100} />
                                </Typography>
                                <Typography color="textSecondary" >
                                    The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typical range between -60 and 0 db.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card >
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Valence : {track.valence}
                                </Typography>
                                <Typography color="textSecondary">
                                    <LinearProgress variant="determinate" value={20} />
                                </Typography>
                                <Typography color="textSecondary" >
                                    A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            
            </Container>
        )
    }
}

export default withRouter(Analyse);
