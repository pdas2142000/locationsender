import { StyleSheet } from "react-native";

export const ContentStyles = StyleSheet.create({
    ls_container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ls_image_box: {
        width: 120,
        height: 120,
        overflow: 'hidden',
    },
    ls_img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    ls_text_container: {
        paddingHorizontal: 30,
        marginVertical: 15,
    },
    ls_text: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 20,
        color: '#3270a2',
    },
    ls_info_heading: {
        fontSize: 17,
        fontWeight: '600',
        lineHeight: 20,
        marginVertical: 15,
        textAlign: 'center',
    },
    ls_info_box: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ls_info_box_text: {
        fontSize: 15,
        fontWeight: '700',
        lineHeight: 20,
        color: '#1e1c1e',
    },
    ls_info_loading_text: {
        fontSize: 13,
        fontWeight: '600',
        lineHeight: 20,
        color: '#E6E6E6'
    },
    ls_btn: {
        backgroundColor: "#B82132",
        borderRadius: 7,
        width:340,
        height:50,
        alignItems:"center",
        justifyContent:"center"
    },
    ls_btn_container: {
        gap: 15,
        marginTop: 10
    },
    ls_btn_text: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '600',
        color: 'white',
    },
    ls_badge: {
        width: 20,
        height: 20,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 5,
    },
    ls_btn_start:{ 
        backgroundColor: "#3270a2", 
        flexDirection: "row", 
        alignItems: "center" 
    }
});

