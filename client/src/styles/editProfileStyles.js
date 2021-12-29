import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
    card: {
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1em',
        width: '50vw',
        maxWidth: '20rem',
        minWidth: '20rem',
        position: 'relative',
    },
    box: {
        display: 'flex',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        position: 'absolute !important',
        top: 0,
        left: 0,
    },
    cardHeader: {
        width: 'max-content',
        height: '1em',
    },
    cardContent: { width: '100%', textAlign: 'center' },
    dropZoneOver: {
        borderStyle: 'solid',
    },
    dropZone: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    gridContainer: { alignItems: 'center', width: '100% !important', marginLeft: '0 !important' },
    gridItem: {
        padding: '0 !important',
        width: '15em',
        marginTop: '2.5em !important',
        maxWidth: '15em',
    },
    imageUploadSection: {
        height: '10em',
        border: '2px dashed #000',
        marginTop: '1.5em !important',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '8em',
        height: '8em',
        objectFit: 'cover',
        borderRadius: '50%',
        objectPosition: 'center',
    },
}));

export { useStyles };
