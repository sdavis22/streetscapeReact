import React, { createRef, useState, useCallback } from "react";
import "./styles.css";
import { Image as KonvaImage, Layer, Stage, Transformer } from "react-konva";
import useImage from "use-image";
import { IndividualSticker } from "./individualSticker";
import { stickersData } from "./stickers.data";
