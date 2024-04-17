import { Box, Button, Typography } from "@mui/material";

export default function SidebarNav() {
    return (
        <Box width={`300px`} minHeight={`100%`} borderRight={`3px solid darkgray`} bgcolor={`#0b2431`} color={`white`} paddingY={1} display={'flex'} justifyContent={'center'}>
            <Box width={'90%'}>
                <Typography variant="h4" fontWeight={500} marginBottom={2}>Fresh For All</Typography>
                <Box>
                    <Typography variant="body1" fontSize={20}>General</Typography>
                    <Button>Dashboard</Button>
                </Box>
            </Box>
        </Box>
    )
}