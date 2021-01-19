import React, { Component } from "react";
import { get, post } from "../../utilities";

import "../../utilities.css";
import TopTracks from "../modules/TopTracks";
import TopArtists from "../modules/TopArtists";
import Card from "../modules/Card";
import Form from "../modules/Form"

import "./Stats.css";

class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topTracks: [],
            topArtists: [],
            // can test with 'krishnahibye' or 'helen_hu'
            otherId: 'krishnahibye',
        };
    }

    componentDidMount() {
        console.log("fetching top tracks");
        get("/api/topTracks").then((data) => {
            console.log(data)
            // let topTitles = [];
            // data.forEach(function (item, i) {
            //     let title = {
            //         name: item.name,
            //         image: item.album.images[0].url,
            //     }
            //     topTitles.push(title)
            // });
            // console.log(topTitles)
            this.setState({ 
                topTracks: data, 
            });
        });

        get("/api/topArtists").then((data) => {
            console.log('my top artists: ', data);
            this.setState({
                topArtists: data,
            })
        });

        
    }

    getOtherTopTracks = () => {
        // gets other user's top tracks
        // get("/api/user-topTracks", { otherId: this.state.otherId }).then((data) => {
        //     console.log(this.state.otherId, 'top tracks: ', data.tracks);
        // })
    }

    getOtherTopArtists = () => {
        // gets other user's top artists
        get("/api/user-topArtists", { otherId: this.state.otherId }).then((data) => {
            console.log(this.state.otherId, 'top artists: ', data.artists);
        })
    }

    render() {
        if (!this.state.topTracks || !this.state.topArtists) {
            return <div> Loading! </div>;
        }
        return (
            <>
            <div>
                <h1>This is the stats page</h1>
                <button onClick={this.getOtherTopArtists}>Get other user's top artists (hardcoded user rn)</button>
                <button onClick={this.getOtherTopTracks}>Get other user's top tracks (hardcoded user rn)</button>
                <Form />
                <Card>
                    <TopTracks data={this.state.topTracks} />
                </Card> 
            </div>
            <div>
                <TopArtists topArtists={this.state.topArtists} />
            </div>
            </>
        );
    }
}

export default Stats;