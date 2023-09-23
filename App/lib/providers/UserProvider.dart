import 'package:bin_tracker_flutter/classes/User.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class UserProvider with ChangeNotifier {
  User? _user;

  User? get user => _user;

  void setUser(User user) {
    _user = user;
    notifyListeners();
  }


  Future<bool> checkLoggedIn(BuildContext context) async {
    final userProvider = Provider.of<UserProvider>(context, listen: false);

    await Future.delayed(Duration(seconds: 2));

    if (userProvider._user?.token != null) {
      return true;
    }
    return false;
  }
}
