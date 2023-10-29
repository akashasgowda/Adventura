import { useSelector } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({setCurrentId}) => {

    const posts = useSelector((state)=> state.posts);
    const classes = useStyles();

    return(
        // if post.length => 0 => then !0=true
        !posts.length ? <CircularProgress/> :(
            <Grid container className={classes.container} spacing={3}>
                {posts.map((post) => (
                    <Grid item key={post._id} xs={12} sm={6} md={6}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
};

export default Posts;