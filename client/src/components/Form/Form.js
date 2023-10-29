import { useEffect, useState } from "react";
import { Button, Paper, TextField, Typography } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch,useSelector } from "react-redux";
import { createPost,updatePost } from "../../actions/post";
import useStyles from "./styles";

const initialData = {
  title: "",
  message: "",
  tags: "",
  selectedFile: "",
};

const Form = ({currentId, setCurrentId}) => {
  const post = useSelector((state)=> currentId ? state.posts.find((p)=>p._id === currentId) : null );
  const [postData, setPostData] = useState(initialData);
  const dispatch = useDispatch();
  const classes = useStyles();
  
  const user = JSON.parse(localStorage.getItem('profile'));

  // to change the content when post change 
  useEffect(()=>{
    if(post)
      setPostData(post);
  },[post]);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    
    if(currentId)
      dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
    else
      dispatch(createPost({...postData, name: user?.result?.name}));
      
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData(initialData);
  };

  if(!user?.result?.name)
  {
    return(
      <Paper className={classes.paper}>
          <Typography variant="h6" align="center">
            Please Sign In to create your own Adventures and like other's adventures.
          </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper} elevation={2}>
      <form
        className={`${classes.root} ${classes.form}`}
        autoComplete="off"
        noValidate
        onSubmit={submitHandler}
      >
        <Typography variant="h6">{currentId ? 'Editing' : 'Create'} Adventure</Typography>
        {/* Not needed bcaz user can create post only when he is logged in 
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData((prevData) => ({ ...prevData, creator: e.target.value }))
          }
        /> */}
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
