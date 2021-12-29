import { useState, useCallback } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useStyles } from '../styles/editProfileStyles';
import { useDropzone } from 'react-dropzone';

function EditProfile() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [fileName, setFileName] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const {
        currentUser: {
            user: { username, imgUrl },
        },
        updateDetails,
    } = useAuth();
    const [usernameVal, setUsernameVal] = useState(username);
    const onDrop = useCallback(acceptedFiles => {
        readImage(acceptedFiles);
    }, []);
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    const rootProps = getRootProps();

    const handleDrop = ev => {
        console.log(ev.dataTransfer.files);
        ev.preventDefault();
        readImage(ev.dataTransfer.files);
    };

    const readImage = acceptedFiles => {
        console.log(acceptedFiles);
        Array.from(acceptedFiles).forEach(file => {
            if (file.type.includes('image/')) {
                const reader = new FileReader();
                reader.onabort = () => console.log('file reading was aborted');
                reader.onerror = () => console.log('file reading has failed');
                reader.onload = () => {
                    const dataURL = reader.result;
                    setFileName(dataURL);
                };
                setImageFile(file);
                reader.readAsDataURL(file);
            } else {
                console.log('Not an image');
            }
        });
    };

    const updateProfileHandler = ev => {
        if (!usernameVal || (usernameVal === username && !fileName)) {
            console.log('No Change');
            navigate('/');
        } else {
            console.log('Change');
            updateDetails(usernameVal ? usernameVal : username, imageFile);
        }
    };

    return (
        <Box className={classes.box}>
            <Card className={classes.card}>
                <Button className={classes.btn} onClick={ev => navigate('/')}>
                    Back
                </Button>
                <CardHeader
                    avatar={<Avatar src={imgUrl} alt='display picture' />}
                    className={classes.cardHeader}
                />
                <CardContent className={classes.cardContent}>
                    <Grid
                        container
                        direction={'column'}
                        className={classes.gridContainer}
                        spacing={5}
                    >
                        <Grid item className={classes.gridItem}>
                            <TextField
                                id='outlined-helperText'
                                label='Username'
                                defaultValue={username}
                                style={{ width: '100%' }}
                                onChange={ev => setUsernameVal(ev.target.value)}
                            />
                        </Grid>
                        <Grid item className={`${classes.imageUploadSection} ${classes.gridItem}`}>
                            {fileName && (
                                <img
                                    src={fileName}
                                    className={classes.image}
                                    onClick={ev => rootProps.ref.current.click()}
                                    alt='img preview'
                                />
                            )}
                            <div
                                {...rootProps}
                                className={classes.dropZone}
                                onDrop={handleDrop}
                                style={{ display: fileName ? 'none' : 'flex' }}
                            >
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                            {/* )} */}
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button variant='contained' onClick={updateProfileHandler}>
                        Save
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default EditProfile;
