import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
import Card from '../Card/Card';
import PlaceholderCard from '../Card/PlaceholderCard';
import { postsURL } from "../../Config/config"

import "./ListingPage.css"
import "../../../node_modules/bootstrap/dist/css/bootstrap.css"

export default function ListingPage() {

    const [posts, setposts] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        axios
            .get(postsURL)
            .then((res) => {
                res = res.data;
                setposts(res);
                setloading(false);
            })
    }, [])


    return (
        <div className='container-fluid p-3'>
            <h1 className="display-3 text-center mb-3">Latest Blog Posts</h1>
            {
                (loading)
                    ?
                    <div className='row'>
                        {[...Array(4)].map((_, idx) => <div key={idx} className='col-md-6 mb-2'><PlaceholderCard /></div>)}
                    </div>

                    : <Row>
                        {
                            posts.map((post) => {
                                return (
                                    <Col md="4" mb="3" key={post.id} className="mb-3">
                                        <Card
                                            title={post.title.rendered}
                                            excerpt={post.excerpt.rendered}
                                            link={post.link}
                                            image={post.jetpack_featured_media_url}
                                            date={post.date}
                                            author={post.parselyMeta['parsely-author'][0]}
                                            authorProfilePicture={post._links.authors[0].href}
                                        />
                                    </Col>
                                )
                            })
                        }
                    </Row>
            }
        </div>
    )
}