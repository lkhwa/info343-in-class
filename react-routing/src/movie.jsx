import React from "react";

const POSTER_BASE_URL = "http://image.tmdb.org/t/p/w154";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>{this.props.movie.title}</h2>
                <img src={POSTER_BASE_URL + this.props.movie.poster_path}></img>
                <p>{this.props.movie.overview}</p>
            </div>
        );
    }
}