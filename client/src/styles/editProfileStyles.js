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
}));

export { useStyles };
