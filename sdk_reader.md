# Reader
This module allows the reading of a document / passport. ID-cards and passports can be used. The first step is to read the MRZ (Machine Readable Zone). From this information we extract among other information the document number, expiration date and birth date.

These three are needed to read the NFC. We pass those three to the scan NFC function to read the datagroups from the document. Once we have those datagroups we can use the helper functions to retrieve the data from those groups (personal information / document image)