import React, { useEffect, useState } from 'react'
import './Card.css'
import "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import axios from 'axios';

function NewCard(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [authorProfilePictureUrl, setauthorProfilePictureUrl] = useState("https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol-thumbnail.png");
    const [authorProfile, setauthorProfile] = useState("#");

    useEffect(() => {
        axios.get(props.authorProfilePicture)
            .then(author => {
                author = author.data;
                setauthorProfilePictureUrl(author.avatar_urls['48']);
                setauthorProfile(author.link);
            })
    }, [])


    return (

        <div className="card h-100">
            {isLoading && (
                <div class="d-flex justify-content-center">
                    <div class="spinner-grow text-center m-5" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            <img
                src={props.image}
                className={`card-img-top ${isLoading ? "" : "loaded"}`}
                alt="Blog Thumbnail"
                style={{ height: "250px", cursor:"pointer" }}
                onLoad={() => setIsLoading(false)}
                onClick={() => window.open(props.link, '_blank')}
            />
            <div className="card-body">
                <h5 className="card-title" dangerouslySetInnerHTML={{ "__html": props.title }}></h5>
                <p dangerouslySetInnerHTML={{ "__html": props.excerpt }} className='card-text'></p>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center author" onClick={() => window.open(authorProfile, '_blank')}>
                        <img src={authorProfilePictureUrl} className="rounded-circle mr-3" style={{ width: "30px", height: "30px" }} />
                        <small className="text-muted">&nbsp;&nbsp;{props.author}</small>
                    </div>
                    <small className="text-muted date"><em className="fa fa-calendar" aria-hidden="true"></em>&nbsp;{props.date.split("T")[0]}</small>
                </div>
                <div className="btn-group">
                    <a href={props.link} target="_blank">
                        <button type="button" className="btn btn-link">
                            Read More <em class="fa fa-external-link" aria-hidden="true"></em>
                        </button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default NewCard