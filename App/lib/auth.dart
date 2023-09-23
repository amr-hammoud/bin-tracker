import 'dart:convert';
import 'package:bin_tracker_flutter/classes/User.dart';
import 'package:bin_tracker_flutter/providers/UserProvider.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class AuthPage extends StatefulWidget {
  const AuthPage({super.key});

  @override
  State<AuthPage> createState() => _AuthPageState();
}

class _AuthPageState extends State<AuthPage> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  String _emailOrUsername = "";
  String _email = "";
  String _username = "";
  String _password = "";

  void _login() {
    final form = _formKey.currentState;
    final userProvider = Provider.of<UserProvider>(context, listen: false);

    if (form != null && form.validate()) {
      form.save();

      if (_emailOrUsername.contains("@")) {
        _email = _emailOrUsername;
        _username = "";
      } else {
        _username = _emailOrUsername;
        _email = "";
      }

      final dio = Dio();

      final data = {
        'email': _email,
        'username': _username,
        'password': _password,
      };


      dio
          .post('http://192.168.1.15:8000/auth/login', data: data)
          .then((response) async {
        if (response.statusCode == 200) {
          final responseData = jsonEncode(response.data);
          Map<String, dynamic> jsonMap = json.decode(responseData);
          User user = User.fromJson(jsonMap);
          userProvider.setUser(user);
        } else {
          print("Login Failed");
        }
      }).catchError((err) {
        print("Error: $err");
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
          child: Form(
        key: _formKey,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Padding(
              padding: EdgeInsets.all(20),
              child: Image.asset(
                'assets/logo.png',
                height: 150,
              ),
            ),
            const Text(
              "Login",
              style: TextStyle(fontSize: 36, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            Padding(
              padding: const EdgeInsets.all(20.0),
              child: TextFormField(
                keyboardType: TextInputType.emailAddress,
                decoration: const InputDecoration(
                  labelText: "Email/Username",
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your email/username';
                  }
                  return null;
                },
                onSaved: (newValue) {
                  _emailOrUsername = newValue ?? "";
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(20.0),
              child: TextFormField(
                obscureText: true,
                decoration: const InputDecoration(
                  labelText: "Password",
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your password';
                  }
                  return null;
                },
                onSaved: (newValue) {
                  _password = newValue ?? "";
                },
              ),
            ),
            ElevatedButton(
              onPressed: _login,
              child: const Text("Login"),
            )
          ],
        ),
      )),
    );
  }
}
