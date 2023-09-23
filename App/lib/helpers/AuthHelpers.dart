import 'package:bin_tracker_flutter/secure_storage/SecureStorage.dart';
import 'package:flutter/material.dart';

class AuthHelpers {
  SecureStorage storage = SecureStorage();

  Future<bool> checkLoggedIn(BuildContext context) async {
    await Future.delayed(Duration(seconds: 2));
    try {
      String? token =
          await storage.readStorage("token"); // Await the Future here
      if (token != null) {
        return true;
      }
    } catch (err) {
      print(err);
    }

    return false;
  }

  void logout() {
    storage.writeStorage("token", null);
  }
}
