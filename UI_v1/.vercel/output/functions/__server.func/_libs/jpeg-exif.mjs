import { a as __toCommonJS, i as __require, n as __esmMin, r as __exportAll, t as __commonJSMin } from "../_runtime.mjs";
//#region node_modules/jpeg-exif/lib/tags.json
var tags_exports = /* @__PURE__ */ __exportAll({
	default: () => tags_default,
	gps: () => gps,
	ifd: () => ifd
});
var ifd, gps, tags_default;
var init_tags = __esmMin((() => {
	ifd = {
		"010e": "ImageDescription",
		"010f": "Make",
		"011a": "XResolution",
		"011b": "YResolution",
		"011c": "PlanarConfiguration",
		"012d": "TransferFunction",
		"013b": "Artist",
		"013e": "WhitePoint",
		"013f": "PrimaryChromaticities",
		"0100": "ImageWidth",
		"0101": "ImageHeight",
		"0102": "BitsPerSample",
		"0103": "Compression",
		"0106": "PhotometricInterpretation",
		"0110": "Model",
		"0111": "StripOffsets",
		"0112": "Orientation",
		"0115": "SamplesPerPixel",
		"0116": "RowsPerStrip",
		"0117": "StripByteCounts",
		"0128": "ResolutionUnit",
		"0131": "Software",
		"0132": "DateTime",
		"0201": "JPEGInterchangeFormat",
		"0202": "JPEGInterchangeFormatLength",
		"0211": "YCbCrCoefficients",
		"0212": "YCbCrSubSampling",
		"0213": "YCbCrPositioning",
		"0214": "ReferenceBlackWhite",
		"829a": "ExposureTime",
		"829d": "FNumber",
		"920a": "FocalLength",
		"927c": "MakerNote",
		"8298": "Copyright",
		"8769": "ExifIFDPointer",
		"8822": "ExposureProgram",
		"8824": "SpectralSensitivity",
		"8825": "GPSInfoIFDPointer",
		"8827": "PhotographicSensitivity",
		"8828": "OECF",
		"8830": "SensitivityType",
		"8831": "StandardOutputSensitivity",
		"8832": "RecommendedExposureIndex",
		"8833": "ISOSpeed",
		"8834": "ISOSpeedLatitudeyyy",
		"8835": "ISOSpeedLatitudezzz",
		"9000": "ExifVersion",
		"9003": "DateTimeOriginal",
		"9004": "DateTimeDigitized",
		"9101": "ComponentsConfiguration",
		"9102": "CompressedBitsPerPixel",
		"9201": "ShutterSpeedValue",
		"9202": "ApertureValue",
		"9203": "BrightnessValue",
		"9204": "ExposureBiasValue",
		"9205": "MaxApertureValue",
		"9206": "SubjectDistance",
		"9207": "MeteringMode",
		"9208": "LightSource",
		"9209": "Flash",
		"9214": "SubjectArea",
		"9286": "UserComment",
		"9290": "SubSecTime",
		"9291": "SubSecTimeOriginal",
		"9292": "SubSecTimeDigitized",
		"a000": "FlashpixVersion",
		"a001": "ColorSpace",
		"a002": "PixelXDimension",
		"a003": "PixelYDimension",
		"a004": "RelatedSoundFile",
		"a005": "InteroperabilityIFDPointer",
		"a20b": "FlashEnergy",
		"a20c": "SpatialFrequencyResponse",
		"a20e": "FocalPlaneXResolution",
		"a20f": "FocalPlaneYResolution",
		"a40a": "Sharpness",
		"a40b": "DeviceSettingDescription",
		"a40c": "SubjectDistanceRange",
		"a210": "FocalPlaneResolutionUnit",
		"a214": "SubjectLocation",
		"a215": "ExposureIndex",
		"a217": "SensingMethod",
		"a300": "FileSource",
		"a301": "SceneType",
		"a302": "CFAPattern",
		"a401": "CustomRendered",
		"a402": "ExposureMode",
		"a403": "WhiteBalance",
		"a404": "DigitalZoomRatio",
		"a405": "FocalLengthIn35mmFilm",
		"a406": "SceneCaptureType",
		"a407": "GainControl",
		"a408": "Contrast",
		"a409": "Saturation",
		"a420": "ImageUniqueID",
		"a430": "CameraOwnerName",
		"a431": "BodySerialNumber",
		"a432": "LensSpecification",
		"a433": "LensMake",
		"a434": "LensModel",
		"a435": "LensSerialNumber",
		"a500": "Gamma"
	};
	gps = {
		"0000": "GPSVersionID",
		"0001": "GPSLatitudeRef",
		"0002": "GPSLatitude",
		"0003": "GPSLongitudeRef",
		"0004": "GPSLongitude",
		"0005": "GPSAltitudeRef",
		"0006": "GPSAltitude",
		"0007": "GPSTimeStamp",
		"0008": "GPSSatellites",
		"0009": "GPSStatus",
		"000a": "GPSMeasureMode",
		"000b": "GPSDOP",
		"000c": "GPSSpeedRef",
		"000d": "GPSSpeed",
		"000e": "GPSTrackRef",
		"000f": "GPSTrack",
		"0010": "GPSImgDirectionRef",
		"0011": "GPSImgDirection",
		"0012": "GPSMapDatum",
		"0013": "GPSDestLatitudeRef",
		"0014": "GPSDestLatitude",
		"0015": "GPSDestLongitudeRef",
		"0016": "GPSDestLongitude",
		"0017": "GPSDestBearingRef",
		"0018": "GPSDestBearing",
		"0019": "GPSDestDistanceRef",
		"001a": "GPSDestDistance",
		"001b": "GPSProcessingMethod",
		"001c": "GPSAreaInformation",
		"001d": "GPSDateStamp",
		"001e": "GPSDifferential",
		"001f": "GPSHPositioningError"
	};
	tags_default = {
		ifd,
		gps
	};
}));
//#endregion
//#region node_modules/jpeg-exif/lib/index.js
var require_lib = /* @__PURE__ */ __commonJSMin(((exports) => {
	_interopRequireDefault(__require("fs"));
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	var tags = (init_tags(), __toCommonJS(tags_exports).default);
	var bytes = [
		0,
		1,
		1,
		2,
		4,
		8,
		1,
		1,
		2,
		4,
		8,
		4,
		8
	];
	var SOIMarkerLength = 2;
	var JPEGSOIMarker = 65496;
	var TIFFINTEL = 18761;
	var TIFFMOTOROLA = 19789;
	var APPMarkerLength = 2;
	var APPMarkerBegin = 65504;
	var APPMarkerEnd = 65519;
	var data = void 0;
	/**
	* @param buffer {Buffer}
	* @returns {Boolean}
	* @example
	* var content = fs.readFileSync("~/Picture/IMG_0911.JPG");
	* var isImage = isValid(content);
	* console.log(isImage);
	*/
	var isValid = function isValid(buffer) {
		try {
			return buffer.readUInt16BE(0) === JPEGSOIMarker;
		} catch (e) {
			throw new Error("Unsupport file format.");
		}
	};
	/**
	* @param buffer {Buffer}
	* @returns {Boolean}
	* @example
	*/
	var isTiff = function isTiff(buffer) {
		try {
			var SOIMarker = buffer.readUInt16BE(0);
			return SOIMarker === TIFFINTEL || SOIMarker === TIFFMOTOROLA;
		} catch (e) {
			throw new Error("Unsupport file format.");
		}
	};
	/**
	* @param buffer {Buffer}
	* @returns {Number}
	* @example
	* var content = fs.readFileSync("~/Picture/IMG_0911.JPG");
	* var APPNumber = checkAPPn(content);
	* console.log(APPNumber);
	*/
	var checkAPPn = function checkAPPn(buffer) {
		try {
			var APPMarkerTag = buffer.readUInt16BE(0);
			return APPMarkerTag >= APPMarkerBegin && APPMarkerTag <= APPMarkerEnd ? APPMarkerTag - APPMarkerBegin : false;
		} catch (e) {
			throw new Error("Invalid APP Tag.");
		}
	};
	/**
	* @param buffer {Buffer}
	* @param tagCollection {Object}
	* @param order {Boolean}
	* @param offset {Number}
	* @returns {Object}
	* @example
	* var content = fs.readFileSync("~/Picture/IMG_0911.JPG");
	* var exifFragments = IFDHandler(content, 0, true, 8);
	* console.log(exifFragments.value);
	*/
	var IFDHandler = function IFDHandler(buffer, tagCollection, order, offset) {
		var entriesNumber = order ? buffer.readUInt16BE(0) : buffer.readUInt16LE(0);
		if (entriesNumber === 0) return {};
		var entries = buffer.slice(2);
		var entryLength = 12;
		var exif = {};
		var entryCount = 0;
		for (; entryCount < entriesNumber; entryCount += 1) {
			var entryBegin = entryCount * entryLength;
			var entry = entries.slice(entryBegin, entryBegin + entryLength);
			var tagBegin = 0;
			var dataFormatBegin = tagBegin + 2;
			var componentsBegin = dataFormatBegin + 2;
			var dataValueBegin = componentsBegin + 4;
			var dataValueLength = 4;
			var tagAddress = entry.slice(tagBegin, dataFormatBegin);
			var tagName = tagCollection[order ? tagAddress.toString("hex") : tagAddress.reverse().toString("hex")];
			var bigDataFormat = entry.readUInt16BE(dataFormatBegin);
			var littleDataFormat = entry.readUInt16LE(dataFormatBegin);
			var dataFormat = order ? bigDataFormat : littleDataFormat;
			var componentsByte = bytes[dataFormat];
			var bigComponentsNumber = entry.readUInt32BE(componentsBegin);
			var littleComponentNumber = entry.readUInt32LE(componentsBegin);
			var dataLength = (order ? bigComponentsNumber : littleComponentNumber) * componentsByte;
			var dataValue = entry.slice(dataValueBegin, dataValueBegin + dataValueLength);
			if (dataLength > 4) {
				var dataOffset = (order ? dataValue.readUInt32BE(0) : dataValue.readUInt32LE(0)) - offset;
				dataValue = buffer.slice(dataOffset, dataOffset + dataLength);
			}
			var tagValue = void 0;
			if (tagName) {
				switch (dataFormat) {
					case 1:
						tagValue = dataValue.readUInt8(0);
						break;
					case 2:
						tagValue = dataValue.toString("ascii").replace(/\0+$/, "");
						break;
					case 3:
						tagValue = order ? dataValue.readUInt16BE(0) : dataValue.readUInt16LE(0);
						break;
					case 4:
						tagValue = order ? dataValue.readUInt32BE(0) : dataValue.readUInt32LE(0);
						break;
					case 5:
						tagValue = [];
						for (var i = 0; i < dataValue.length; i += 8) {
							var bigTagValue = dataValue.readUInt32BE(i) / dataValue.readUInt32BE(i + 4);
							var littleTagValue = dataValue.readUInt32LE(i) / dataValue.readUInt32LE(i + 4);
							tagValue.push(order ? bigTagValue : littleTagValue);
						}
						break;
					case 7:
						switch (tagName) {
							case "ExifVersion":
								tagValue = dataValue.toString();
								break;
							case "FlashPixVersion":
								tagValue = dataValue.toString();
								break;
							case "SceneType":
								tagValue = dataValue.readUInt8(0);
								break;
							default:
								tagValue = "0x" + dataValue.toString("hex", 0, 15);
								break;
						}
						break;
					case 10:
						var bigOrder = dataValue.readInt32BE(0) / dataValue.readInt32BE(4);
						var littleOrder = dataValue.readInt32LE(0) / dataValue.readInt32LE(4);
						tagValue = order ? bigOrder : littleOrder;
						break;
					default:
						tagValue = "0x" + dataValue.toString("hex");
						break;
				}
				exif[tagName] = tagValue;
			}
		}
		return exif;
	};
	/**
	* @param buf {Buffer}
	* @returns {Undefined}
	* @example
	* var content = fs.readFileSync("~/Picture/IMG_0911.JPG");
	* var exifFragments = EXIFHandler(content);
	*/
	var EXIFHandler = function EXIFHandler(buf) {
		var pad = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
		var buffer = buf;
		if (pad) {
			buffer = buf.slice(APPMarkerLength);
			var length = buffer.readUInt16BE(0);
			buffer = buffer.slice(0, length);
			buffer = buffer.slice(2);
			buffer = buffer.slice(5);
			buffer = buffer.slice(1);
		}
		var byteOrderLength = 2;
		var byteOrder = buffer.toString("ascii", 0, byteOrderLength) === "MM";
		var fortyTwoEnd = byteOrderLength + 2;
		var big42 = buffer.readUInt32BE(fortyTwoEnd);
		var little42 = buffer.readUInt32LE(fortyTwoEnd);
		var offsetOfIFD = byteOrder ? big42 : little42;
		buffer = buffer.slice(offsetOfIFD);
		if (buffer.length > 0) {
			data = IFDHandler(buffer, tags.ifd, byteOrder, offsetOfIFD);
			if (data.ExifIFDPointer) {
				buffer = buffer.slice(data.ExifIFDPointer - offsetOfIFD);
				data.SubExif = IFDHandler(buffer, tags.ifd, byteOrder, data.ExifIFDPointer);
			}
			if (data.GPSInfoIFDPointer) {
				var gps = data.GPSInfoIFDPointer;
				buffer = buffer.slice(data.ExifIFDPointer ? gps - data.ExifIFDPointer : gps - offsetOfIFD);
				data.GPSInfo = IFDHandler(buffer, tags.gps, byteOrder, gps);
			}
		}
	};
	/**
	* @param buffer {Buffer}
	* @returns {Undefined}
	* @example
	* var content = fs.readFileSync("~/Picture/IMG_0911.JPG");
	* var exifFragments = APPnHandler(content);
	*/
	var APPnHandler = function APPnHandler(buffer) {
		var APPMarkerTag = checkAPPn(buffer);
		if (APPMarkerTag !== false) {
			var length = buffer.readUInt16BE(APPMarkerLength);
			switch (APPMarkerTag) {
				case 1:
					EXIFHandler(buffer);
					break;
				default:
					APPnHandler(buffer.slice(APPMarkerLength + length));
					break;
			}
		}
	};
	exports.fromBuffer = function fromBuffer(buffer) {
		if (!buffer) throw new Error("buffer not found");
		data = void 0;
		if (isValid(buffer)) {
			buffer = buffer.slice(SOIMarkerLength);
			data = {};
			APPnHandler(buffer);
		} else if (isTiff(buffer)) {
			data = {};
			EXIFHandler(buffer, false);
		}
		return data;
	};
}));
//#endregion
export { require_lib as t };
