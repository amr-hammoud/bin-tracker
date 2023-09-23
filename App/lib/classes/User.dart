class User {
  String token;
  UserData user;

  User({required this.token, required this.user});

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
}
