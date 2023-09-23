import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final storage = FlutterSecureStorage();

class User {
  String token;
  UserData user;

  User({required this.token, required this.user});

  String toJson() {
    return jsonEncode({
      'token': token,
      'user': user.toJson(),
    });
  }

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      token: json['token'],
      user: UserData.fromJson(json['user']),
    );
  }
}

class UserData {
  final String id;
  final String firstName;
  final String lastName;
  final String username;
  final String userType;
  final DateTime createdAt;
  final DateTime updatedAt;
  final String email;

  UserData({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.username,
    required this.userType,
    required this.createdAt,
    required this.updatedAt,
    required this.email,
  });

  factory UserData.fromJson(Map<String, dynamic> json) {
    return UserData(
      id: json['_id'],
      firstName: json['first_name'],
      lastName: json['last_name'],
      username: json['username'],
      userType: json['user_type'],
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: DateTime.parse(json['updatedAt']),
      email: json['email'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'first_name': firstName,
      'last_name': lastName,
      'username': username,
      'user_type': userType,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
      'email': email,
    };
  }
}

Future<void> saveUser(User user) async {
  final jsonString = user.toJson();
  await storage.write(key: 'user', value: jsonString);
}

Future<String?> getUser(String key) async {
  final jsonString = await storage.read(key: 'user');
  if (jsonString != null) {
    final Map<String, dynamic> jsonMap = jsonDecode(jsonString);
    User user = User.fromJson(jsonMap);
    switch (key) {
      case "name":
        return "${user.user.firstName} ${user.user.lastName}"
            as Future<String?>;
      case "firstName":
        return user.user.firstName as Future<String?>;
      case "lastName":
        return user.user.lastName as Future<String?>;
      case "username":
        return user.user.username as Future<String?>;
      case "userType":
        return user.user.userType as Future<String?>;
      case "email":
        return user.user.email as Future<String?>;
      default:
    }
  }
  return null;
}
