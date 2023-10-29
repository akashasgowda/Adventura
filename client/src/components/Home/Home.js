import React, { useState, useEffect } from 'react';
import { Container, Grid, Grow } from '@mui/material';
import { getPosts } from '../../actions/post';

import { useDispatch } from 'react-redux';

import Posts from '../../components/Posts/Posts';
import Form from '../../components/Form/Form';

const Home = () => {

    const [currentId, setCurrentId ] = useState(null);
    const dispatch = useDispatch();

    //  dispatch action to get posts from the store
    useEffect(()=>{
        dispatch(getPosts());
    },[currentId, dispatch]);

  return (
    <Grow in>
            <Container>
                <Grid container  justify="space-between" alignItems='stretch' spacing={4}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
  )
}

export default Home