import { Box, Button, Typography } from "@mui/material";

const NotFound = () => {
    return ( 
        <div className="notFound">
            <Box textAlign="center">
                <br/><br/>
                <img src="https://m.media-amazon.com/images/I/418Jmnejj8L._AC_.jpg" alt="image"></img>
                <Typography  variant="h6" component="div" gutterBottom fontSize={25} mb = {2}>
                    404 - PAGE NOT FOUND
                </Typography>
                <Typography  variant="body2" component="div" gutterBottom fontSize={15} mb = {4}>
                    The page you are looking for might have been removed
                    <br/>
                    had its name changedor is temporarily unavaible.
                </Typography>
                <Button variant="contained" style={{ borderRadius: 50 }} href="/">Go to homepage</Button>
            </Box>
        </div>
    );
}
 
export default NotFound;