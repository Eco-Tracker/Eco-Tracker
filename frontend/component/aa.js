<ScrollView contentContainerStyle={styles.container}>
      <StatusBar style={styles.container} />
      <TouchableOpacity onPress={goBack} style={styles.appButtonContainer}>
        <Icon name="arrow-back" size={34} color="green" />
      </TouchableOpacity>
      <Image source={logo} style={styles.logo} />

      <View style={styles.imageContainer}>
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        )}
        <TouchableOpacity onPress={selectImage} style={{ height: 100, width: 100, borderColor: "gray", borderWidth: 3, borderStyle: "dashed", borderRadius: 10, justifyContent: "center" }} >
          <Text style={{ textAlign: "center" }}>Select Image</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.textInput}
        onChangeText={setname}
        value={name}
        placeholder="Professional Name"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={setmail}
        value={mail}
        placeholder="Professional Mail"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <TextInput
        style={styles.textInput}
        onChangeText={setphone}
        value={phone}
        placeholder="Contact Number"
        keyboardType="numeric"
      />
     

      <TouchableOpacity onPress={updateProfile} style={styles.appButtonContainer1}>
        <Text style={styles.appButtonText}>Submit</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </ScrollView>