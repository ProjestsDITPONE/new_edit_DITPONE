import { StyleSheet, Dimensions } from "react-native";
import { ViewScale } from "../../config/ViewScale";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default StyleSheet.create({
  ViewSub1: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  alignSelfCenter: {
    alignSelf: "center",
    marginTop: ViewScale(10),
  },
  TextSub1: {
    fontSize: ViewScale(25),
    color: "#20416e",
  },
  TextSub2: {
    fontSize: ViewScale(15),
    color: "#9dadb8",
  },
  ViewSub2: {
    alignSelf: "center",
    marginTop: ViewScale(20),
    flexDirection: "row",
    alignItems: "center",
  },
  ViewSub3: {
    width: ViewScale(50),
    height: ViewScale(50),
    alignItems: "center",
    justifyContent: "center",
  },
  TextSub3: {
    fontSize: ViewScale(30),
    color: "#ffffff",
  },
  ImageSub1: {
    width: ViewScale(107),
    height: ViewScale(3),
    right: ViewScale(3),
  },
  ImageBackgroundSub1: {
    width: ViewScale(40),
    height: ViewScale(40),
    right: ViewScale(3),
    alignItems: "center",
    justifyContent: "center",
  },
  ViewSub4: {
    alignSelf: "center",
    flexDirection: "row",
  },
  TextSub4: {
    fontSize: ViewScale(16),
    color: "#40536d",
  },
  TextSub5: {
    fontSize: ViewScale(16),
    color: "#dcdee6",
  },
  ViewSub5: {
    width: ViewScale(109),
    height: ViewScale(3),
    right: ViewScale(1),
    backgroundColor: "#2d6dc4",
  },
  ViewSub6: {
    width: ViewScale(50),
    height: ViewScale(50),
    right: ViewScale(3),
    alignItems: "center",
    justifyContent: "center",
  },
  TextSub6: {
    fontSize: ViewScale(16),
    color: "#40536d",
  },
  ViewSub7: {
    alignItems: "center",
    // margin: 20,
    // alignSelf: 'center',
  },
  ViewSub8: {
    // height: '100%',
    backgroundColor: "#e6e9f1",
    // alignItems: 'center',
    // alignSelf: 'center',
    // borderWidth:1,
    borderRadius: ViewScale(8),
  },
  ImageSub2: {
    width: ViewScale(155),
    height: ViewScale(122),
    top: ViewScale(20),
  },
  ViewSub9: {
    flexDirection: "column-reverse",
    flex: 1,
  },
  ViewSub10: {
    width: ViewScale(321),
    height: ViewScale(125),
    backgroundColor: "#2d6dc4",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: ViewScale(20),
  },
  ImageSub3: {
    width: ViewScale(110),
    height: ViewScale(120),
    top: ViewScale(10),
  },
  marginBottom10: {
    // marginBottom: 10,
  },
  TocuhSub1: {
    width: "80%",
    height: ViewScale(48),
    borderRadius: ViewScale(21.5),
    backgroundColor: "#2d6dc4",
    justifyContent: "center",
    // alignSelf: 'center',
    alignItems: "center",
  },
  TocuhSub2: {
    width: "80%",
    height: ViewScale(48),
    borderRadius: ViewScale(21.5),
    backgroundColor: "#dadada",
    justifyContent: "center",
    // alignSelf: 'center',
    alignItems: "center",
  },
  TextSub7: {
    fontSize: ViewScale(25),
    color: "#ffffff",
  },
  ViewSub11: {
    flex: 1,
    left: ViewScale(48),
    top: ViewScale(20),
  },
  ViewSub12: {
    flexDirection: "row",
    alignItems: "center",
  },
  ImageSub4: {
    width: ViewScale(14),
    height: ViewScale(17),
  },
  TextSub8: {
    fontSize: ViewScale(25),
    color: "#4b4b4b",
  },
  ViewSub13: {
    flexDirection: "row",
    alignItems: "center",
    top: ViewScale(18),
  },
  ImageSub5: {
    width: ViewScale(19),
    height: ViewScale(18),
  },
  ImageSub6: {
    width: ViewScale(208),
    height: ViewScale(135),
  },
  ImageSub7: {
    width: ViewScale(112),
    height: ViewScale(148),
    top: ViewScale(20),
  },
  ViewSub14: {
    // flex: 1,
    flexDirection: "row-reverse",
    width: "25%",
  },
  ImageSub8: {
    width: ViewScale(20),
    height: ViewScale(20),
    // bottom: 10,
  },
  bottom45: {
    bottom: ViewScale(45),
  },
  ViewSub15: {
    width: "95%",
    height: null,
  },
  flexDirectionRow: {
    flexDirection: "row-reverse",
  },
  ViewSub16: {
    alignItems: "center",
    // bottom: 10,
  },
  TextSub9: {
    fontSize: ViewScale(28),
    color: "#163c70",
  },
  ViewSub17: {
    flexDirection: "row",
    alignItems: "center",
  },
  ImageSub9: {
    width: ViewScale(18),
    height: ViewScale(18),
    right: ViewScale(6),
  },
  TextSub10: {
    fontSize: ViewScale(22),
    color: "#686868",
  },
  ViewSub18: {
    flexDirection: "row",
    marginTop: ViewScale(10),
    // top: 20,
  },
  ViewSub19: {
    // width: 129,
    height: ViewScale(34),
    backgroundColor: "#04a68a",
    borderRadius: ViewScale(8),
    alignItems: "center",
    // justifyContent: 'center',
    flexDirection: "row",
    textAlign: "center",
    flex: 1.5,
    marginHorizontal: ViewScale(5),
  },
  ViewSub20: {
    width: ViewScale(18),
    height: ViewScale(17),
    right: ViewScale(5),
  },
  TextSub11: {
    fontSize: ViewScale(21),
    color: "#ffffff",
  },
  TocuhSub3: {
    // width: 129,
    height: ViewScale(34),
    backgroundColor: "#499cc3",
    borderRadius: ViewScale(8),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flex: 1.5,
  },
  container: {
    flex: 1,

    alignItems: "center",
    // flexDirection: 'column',
    // backgroundColor: '#2d6dc4',
    backgroundColor: "#2d6dc4",
  },
  preview: {
    // flex: 1,
    // width: width * 0.8,
    // height: height * 0.5,

    width: width * 0.8,
    height: height * 0.5,

    justifyContent: "flex-end",

    backgroundColor: "#4a4a4a",
  },
  capture: {
    flex: 0,
    backgroundColor: "transparent",
    borderRadius: ViewScale(5),
    padding: ViewScale(15),
    paddingHorizontal: ViewScale(20),
    alignSelf: "center",
    margin: ViewScale(20),
  },
  preview1: {
    // flex: 1,
    width: "100%",
    height: "60%",
    borderWidth: ViewScale(2),
    // justifyContent: 'flex-end',
    backgroundColor: "#4a4a4a",
    overflow: "hidden",
    borderColor: "#ffffff",
    borderRadius: ViewScale(8),
  },
  container1: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'red',
  },
  capture1: {
    // flex: 1,
    backgroundColor: "transparent",
    borderRadius: ViewScale(5),
    // padding: 15,
    paddingHorizontal: ViewScale(20),
    alignSelf: "center",
    // margin: 20,
    top: ViewScale(30),
  },
});
