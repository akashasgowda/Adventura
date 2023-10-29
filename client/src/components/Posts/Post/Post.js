import { Card, CardMedia, Typography ,Button, CardContent, CardActions} from '@material-ui/core';
import useStyles from './style';
import  { Delete, MoreHoriz, ThumbUpAlt } from '@material-ui/icons';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost,likePost } from '../../../actions/post';

const Post =({post, setCurrentId})=>{
    const classes = useStyles();
    const dispatch = useDispatch();

    return(
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.name}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>

            <div className={classes.overlay2}>
                <Button
                    style={{color:'white'}}
                    size='small'
                    onClick={()=> setCurrentId(post._id)}
                >
                    <MoreHoriz fontSize='medium'/>
                </Button>
            </div>

            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary' component='h2'>
                    {post.tags.map((tag)=> `#${tag} `)}
                </Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant='h5' component='h2'>{post.title}</Typography>

            <CardContent>
                <Typography variant='body2' color='textSecondary' component="p">{post.message}</Typography>
            </CardContent>

            <CardActions className={classes.CardActions}>
                <Button size='small' color='primary' onClick={()=> dispatch(likePost(post._id))}><ThumbUpAlt fontSize='small'/>&nbsp; Like &nbsp;{post.likeCount}</Button>
                <Button size='small' color='primary' onClick={()=> dispatch(deletePost(post._id))}><Delete fontSize='small'/> Delete</Button>
            </CardActions>

        </Card>          
    
    )
}

export default Post;